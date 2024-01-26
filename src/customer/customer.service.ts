import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Customer } from './entities';
import { CustomerSignInDto, UpdateCustomerPasswordDto, RegistrationCustomer, UpdateCustomerDto } from './dto';


@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)private customerRepository: Repository<Customer>,
    private jwtService: JwtService
  ){}
  
  async registration_customer(registrationCustomer: RegistrationCustomer): Promise<Object>  {
    const [ customer ] = await this.customerRepository.findBy({ phone: registrationCustomer.phone });
    if(customer) return { 
                        message: 'Email already exists',
                        status: HttpStatus.CONFLICT
                      };


    const new_customer = await this.customerRepository.save(
      { 
        ...registrationCustomer,
      }
    );

    const customer_new =  await this.customerRepository.findBy({ phone: new_customer.phone, customer_id: new_customer.customer_id });
    const token = await this.getToken(new_customer);

    return {
      message: 'Successfully Registered',
      status: HttpStatus.OK,
      customer: customer_new,
      token:token
    };
  }

  async signIn(customerSignInDto: CustomerSignInDto): Promise<Object> {
    const [customer] = await this.customerRepository.findBy({ phone: customerSignInDto.phone });
    
    if (!customer) return {
                          message: 'Email or password is incorrect',
                          status: HttpStatus.NOT_FOUND
                        };


    if(!customer.is_active) return {
                                  message: 'Customer is blocked',
                                  status: HttpStatus.FORBIDDEN
                                };

    const token = await this.getToken(customer);

    return {
      message: 'Sign in succesfully Admin', 
      status: HttpStatus.OK,
      Customer: customer,
      token
    }
  }

  async find_one_customer(id: number): Promise<Object> {
    const [ customer ] = await this.customerRepository.findBy({ customer_id: id, is_active: true });
    if (!customer) return {
                              message: 'Customer Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            customer
           };
  }

  async searche_customer(phone: string): Promise<Object> {
    const customer = await this.customerRepository.find({
      where : {
        phone : Like(`%${phone}%`),
      }
    });

    if (customer.length === 0) return {
                              message: 'Customer Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            customer
           };
  }

  async find_all_customers(): Promise<Object> {
    const customer = await this.customerRepository.find({ where: {is_active: true} });
    if (customer.length === 0) return {
                                      message: 'Customers Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            customer
           }
  }

  async find_not_active_customers(): Promise<Object> {
    const customers = await this.customerRepository.find({ where: {is_active: false} });
    if (customers.length === 0) return {
                                      message: 'Customer Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            customers
           }
  }

  async update_data(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Object> {
    const [ customer ] = await this.customerRepository.findBy({ customer_id: id });

    if(!customer) return {
                          message: 'Customer not found',
                          status: HttpStatus.NOT_FOUND
                         };
    
    if (customer.phone !== updateCustomerDto.phone) {
      const [ phone ] = await this.customerRepository.findBy({ phone: updateCustomerDto.phone });
      
      if (!phone) return {
                            message: 'Phone Number already exists',
                            status: HttpStatus.NOT_FOUND
                         };
    }
    
    await this.customerRepository.update(
      { 
        customer_id: id
      },
      {
        ...updateCustomerDto
      }
    );

    const update_customer = await this.customerRepository.findBy({ customer_id: id });

    return {
            status: HttpStatus.OK,
            customer: update_customer
           }
  }

  async active(id: number): Promise<Object | HttpStatus> {
    const [ customer ] = await this.customerRepository.findBy({ customer_id: id });
    if (!customer) return {
                          message: 'Customer Not Found',
                          status: HttpStatus.NOT_FOUND
                        };
    
    if (customer.is_active) {
      await this.customerRepository.update(
        { 
          customer_id: id
        },
        {
          is_active: false
        }
      );
      return {
              message: 'Customer blocked',
              status: HttpStatus.OK
             }
    } else {
      await this.customerRepository.update(
        { 
          customer_id: id
        },
        {
          is_active: true
        }
      );
      return {
              message: 'Customer ativeted',
              status: HttpStatus.OK
             }
    }
  }

  async getToken(customer: Customer) {
    const jwtPayload = { 
                        id: customer.customer_id,
                        is_block: customer.is_active 
                       };
  
    const token = await this.jwtService.signAsync(jwtPayload, {
                    secret: process.env.ACCES_TOKEN_KEY_PERSON,
                    expiresIn: process.env.ACCESS_TOKEN_TIME
                  })
    return token;
  }

  async remove_customer(id: number): Promise<HttpStatus> {
    const [ customer ] = await this.customerRepository.findBy({ customer_id: id });
    if(!customer) return HttpStatus.NOT_FOUND;

    await this.customerRepository.delete({ customer_id: id });

    return HttpStatus.OK;
  } 


}