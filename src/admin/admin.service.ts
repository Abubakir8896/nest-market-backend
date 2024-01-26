import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Admin } from './entities';
import { SignInDto, UpdatePasswordDto, Registration, UpdateAdminDto } from './dto';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)private adminRepository: Repository<Admin>,
    private jwtService: JwtService
  ){}
  
  async registration_admin(registration: Registration): Promise<Object>  {
    const [ admin ] = await this.adminRepository.findBy({ email: registration.email });
    if(admin) return { 
                        message: 'Email already exists',
                        status: HttpStatus.CONFLICT
                      };

    const hashed_password = await bcrypt.hash(registration.password, 7);

    const new_admin = await this.adminRepository.save(
      { 
        ...registration,
        password:hashed_password
      }
      );
      const token = await this.getToken(new_admin);

    const admin_new =  await this.adminRepository.findBy({ email: new_admin.email, admin_id: new_admin.admin_id });

    return {
      message: 'Successfully Registered',
      status: HttpStatus.OK,
      admin: admin_new,
      token:token
    };
  }

  async signIn(signInDto: SignInDto): Promise<Object> {
    const [admin] = await this.adminRepository.findBy({ email: signInDto.email });
    
    if (!admin) return {
                          message: 'Email or password is incorrect',
                          status: HttpStatus.NOT_FOUND
                        };

    const pass = await bcrypt.compare(signInDto.password, admin.password);
    if (!pass) return { 
                        message: 'Email or password is incorrect',
                        status: HttpStatus.NOT_FOUND 
                      };

    if(!admin.is_active) return {
                                  message: 'Admin is blocked',
                                  status: HttpStatus.FORBIDDEN
                                };

    const token = await this.getToken(admin);

  if (admin.is_super_admin) {
      return {
               message: 'Sign in succesfully Super Admin', 
               status: HttpStatus.OK,
               Admin: admin,
               token: token
             }
    }
    return {
      message: 'Sign in succesfully Admin', 
      status: HttpStatus.OK,
      Admin: admin,
      token
    }
  }

  async find_one_super_admin(id: number): Promise<Object> {
    const [ superAdmin ] = await this.adminRepository.findBy({ admin_id: id, is_super_admin: true, is_active: true });
    if (!superAdmin) return {
                              message: 'Super Admin Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            super_admin: superAdmin
           };
  }

  async find_one_admin(id: number): Promise<Object> {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id, is_super_admin:false, is_active: true });
    if (!admin) return {
                              message: 'Admin Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            admin
           };
  }

  async searche_admin(email: string): Promise<Object> {
    const admin = await this.adminRepository.find({
      where : {
        email : Like(`%${email}%`),
      }
    });

    if (admin.length === 0) return {
                              message: 'Admin Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            admin
           };
  }

  async find_all_admins(): Promise<Object> {
    const admins = await this.adminRepository.find({ where: {is_active: true} });
    if (admins.length === 0) return {
                                      message: 'Admins Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            admins
           }
  }

  async find_not_active_admins(): Promise<Object> {
    const admins = await this.adminRepository.find({ where: {is_active: false} });
    if (admins.length === 0) return {
                                      message: 'Admin Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            admins
           }
  }

  async update_data(id: number, updateAdminDto: UpdateAdminDto): Promise<Object> {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id });

    if(!admin) return {
                          message: 'Admin not found',
                          status: HttpStatus.NOT_FOUND
                         };
    
    if (admin.email !== updateAdminDto.email) {
      const [ email ] = await this.adminRepository.findBy({ email: updateAdminDto.email });
      
      if (!email) return {
                            message: 'Email already exists',
                            status: HttpStatus.NOT_FOUND
                         };
    }
    
    await this.adminRepository.update(
      { 
        admin_id: id
      },
      {
        ...updateAdminDto
      }
    );

    const update_admin = await this.adminRepository.findBy({ admin_id: id });

    return {
            status: HttpStatus.OK,
            admin: update_admin
           }
  }

  async update_password(id: number, updatePasswordDto: UpdatePasswordDto): Promise<Object>  {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id });
    if (!admin) return {
                          message: 'Admin Not Found',
                          status: HttpStatus.NOT_FOUND
                        };

    const pass = await bcrypt.compare(updatePasswordDto.password, admin.password);
    if (!pass) return { 
                        message: 'Old password is incorrect', 
                        status: HttpStatus.CONFLICT
                      };

    if(updatePasswordDto.new_password != updatePasswordDto.confirm_password) return {
                                                                                      message: 'Confirm password is incorrect',
                                                                                      status: HttpStatus.UNAUTHORIZED
                                                                                    };
                                                                                    
    const hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 7);

    await this.adminRepository.update(
      {
        admin_id: id
      }, 
      {
        password:hashed_password
      }
    );

    const [ update_pass_admin] =  await this.adminRepository.findBy({ admin_id: id });

    return {
            status: HttpStatus.OK,
            person: update_pass_admin
           }
  }

  async active(id: number): Promise<Object | HttpStatus> {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id });
    if (!admin) return {
                          message: 'Admin Not Found',
                          status: HttpStatus.NOT_FOUND
                        };
    
    if (admin.is_active) {
      await this.adminRepository.update(
        { 
          admin_id: id
        },
        {
          is_active: false
        }
      );
      return {
              message: 'Admin blocked',
              status: HttpStatus.OK
             }
    } else {
      await this.adminRepository.update(
        { 
          admin_id: id
        },
        {
          is_active: true
        }
      );
      return {
              message: 'Admin ativeted',
              status: HttpStatus.OK
             }
    }
  }

  async getToken(admin: Admin) {
    const jwtPayload = { 
                        id: admin.admin_id,
                        is_super_admin: admin.is_super_admin,
                        is_block: admin.is_active 
                       };
  
    const token = await this.jwtService.signAsync(jwtPayload, {
                    secret: process.env.ACCES_TOKEN_KEY_PERSON,
                    expiresIn: process.env.ACCESS_TOKEN_TIME
                  })
    return token;
  }

  async remove_admin(id: number): Promise<HttpStatus> {
    const [ admin ] = await this.adminRepository.findBy({ admin_id: id });
    if(!admin) return HttpStatus.NOT_FOUND;

    await this.adminRepository.delete({ admin_id: id });

    return HttpStatus.OK;
  } 
}