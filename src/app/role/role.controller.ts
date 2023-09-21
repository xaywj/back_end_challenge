import { Role } from 'src/guard/roles.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto'; 
import { Response } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Res() res:Response, @Req() req, @Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  } 

  @UseGuards(AuthGuard) 
  @Role('user')
  @Get()
  findAll(@Req() req:Response | any): any {
    return req.user;
    return this.roleService.findAll();
  }

  @Get(':id')
 findOne(@Res() res:Response, @Param('id') id: string) {  
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Res() res:Response, @Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
