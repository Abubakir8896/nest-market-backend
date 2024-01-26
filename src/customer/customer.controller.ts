import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';

import { Customer } from './entities';
import { CustomerSignInDto, UpdateCustomerPasswordDto, RegistrationCustomer, UpdateCustomerDto } from './dto';
import { CustomerService } from './customer.service';

@ApiTags('customers')
@Controller('customer')
export class CustomerController {
  constructor( private readonly customerService: CustomerService ) {}

  // Customer Registration
  @ApiOperation({summary: 'Customer Registration'})
  @ApiResponse({status: 200, type: Customer})
  @Post('signUp')
  sigin(
    @Body() customerRegistration: RegistrationCustomer
  ): Promise<Object> {
    return this.customerService.registration_customer(customerRegistration);
  }

  // Sign In
  @ApiOperation({summary: 'Sign in'})
  @ApiResponse({status: 200, type: Customer})
  @Post('signin')
  signIn(
    @Body() customerSignInDto: CustomerSignInDto
  ): Promise<Object> {
    return this.customerService.signIn(customerSignInDto)
  }


  // Find One Customer
  @ApiOperation({summary: 'Find one customer'})
  @ApiResponse({status: 200, type: Customer})
  @Get('find-one/customer/:id')
  find_one_customer(
    @Param('id') id: number
  ): Promise<Object> {
    return this.customerService.find_one_customer(id);
  }

  // Searche One Customer
  @ApiOperation({summary: 'Searche customer'})
  @ApiResponse({status: 200, type: Customer})
  @Get('searche/customer/:name')
  searche_customer(
    @Param('name') name: string
  ): Promise<Object> {
    return this.customerService.searche_customer(name);
  }

  // Find All Customer 
  @ApiOperation({summary: 'Find all customers'})
  @ApiResponse({status: 200, type: [Customer]})
  @Get('find-all/customer')
  find_admins(): Promise<Object> {
    return this.customerService.find_all_customers()
  };

  // Find Not Active Customers 
  @ApiOperation({summary: 'Find all not active customers'})
  @ApiResponse({status: 200, type: [Customer]})
  @Get('find-not-active/customers')
  find_not_active_customers(): Promise<Object> {
    return this.customerService.find_not_active_customers()
  };

  // Update Customer Data
  @ApiOperation({summary: 'Update data customer'})
  @ApiResponse({status: 200, type: Customer})
  @Put('update/:id')
  update_data(
    @Param('id') id: number, 
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<Object> {
    return this.customerService.update_data(id, updateCustomerDto)
  }

  // Not Active or Active
  @ApiOperation({summary: 'Update active customer'})
  @ApiResponse({status: 200, type: Customer})
  @Get('active/:id')
  is_customer_user(
    @Param('id') id: number
  ): Promise<Object> {
    return this.customerService.active(id)
  }

  // Remove One Admin BY ID
  @ApiOperation({summary: 'Remove customer'})
  @ApiResponse({status: 200})
  @Delete('remove/:id')
  remove_customer(
    @Param('id') id: number
  ): Promise<Number> {
    return this.customerService.remove_customer(id);
  }
}