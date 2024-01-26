import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';

import { Admin } from './entities';
import { AdminService } from './admin.service';
import { SignInDto, UpdatePasswordDto, Registration, UpdateAdminDto } from './dto';

@ApiTags('admins')
@Controller('admin')
export class AdminsController {
  constructor( private readonly adminService: AdminService ) {}

  // Added Admin
  @ApiOperation({summary: 'Add admin'})
  @ApiResponse({status: 200, type: Admin})
  @Post('signUp')
  sigin(
    @Body() registration: Registration
  ): Promise<Object> {
    return this.adminService.registration_admin(registration);
  }

  // Sign In
  @ApiOperation({summary: 'Sign in'})
  @ApiResponse({status: 200, type: Admin})
  @Post('signin')
  signIn(
    @Body() SignInDto: SignInDto
  ): Promise<Object> {
    return this.adminService.signIn(SignInDto)
  }

  // Find One Super Admin
  @ApiOperation({summary: 'Find one super admin'})
  @ApiResponse({status: 200, type: Admin})
  @Get('find-one/super-admin/:id')
  find_one_super_admin(
    @Param('id') id: number
  ): Promise<Object> {
    return this.adminService.find_one_super_admin(id);
  }

  // Find One Admin
  @ApiOperation({summary: 'Find one admin'})
  @ApiResponse({status: 200, type: Admin})
  @Get('find-one/admin/:id')
  find_one_admin(
    @Param('id') id: number
  ): Promise<Object> {
    return this.adminService.find_one_admin(id);
  }

  // Searche One Admin
  @ApiOperation({summary: 'Searche admin'})
  @ApiResponse({status: 200, type: Admin})
  @Get('searche/admin/:name')
  searche_admin(
    @Param('name') name: string
  ): Promise<Object> {
    return this.adminService.searche_admin(name);
  }

  // Find All Admins 
  @ApiOperation({summary: 'Find all admins'})
  @ApiResponse({status: 200, type: [Admin]})
  @Get('find-all/admins')
  find_admins(): Promise<Object> {
    return this.adminService.find_all_admins()
  };

  // Find Not Active Admins 
  @ApiOperation({summary: 'Find all not active admins'})
  @ApiResponse({status: 200, type: [Admin]})
  @Get('find-not-active/admins')
  find_not_active_persons(): Promise<Object> {
    return this.adminService.find_not_active_admins()
  };

  // Update Admin Data
  @ApiOperation({summary: 'Update data admin'})
  @ApiResponse({status: 200, type: Admin})
  @Put('update/:id')
  update_data(
    @Param('id') id: number, 
    @Body() updateAdminDto: UpdateAdminDto
  ): Promise<Object> {
    return this.adminService.update_data(id, updateAdminDto)
  }

  // Update Admin Password
  @ApiOperation({summary: 'Update password admin'})
  @ApiResponse({status: 200, type: Admin})
  @Put('update-password/:id')
  update_password(
    @Param('id') id: number, 
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<Object> {
    return this.adminService.update_password(id, updatePasswordDto);
  }

  // Not Active or Active
  @ApiOperation({summary: 'Update active customer'})
  @ApiResponse({status: 200, type: Admin})
  @Get('active/:id')
  is_admin_user(
    @Param('id') id: number
  ): Promise<Object> {
    return this.adminService.active(id)
  }

  // Remove One Admin BY ID
  @ApiOperation({summary: 'Remove admin'})
  @ApiResponse({status: 200})
  @Delete('remove/:id')
  remove_admin(
    @Param('id') id: number
  ): Promise<Number> {
    return this.adminService.remove_admin(id);
  }
}