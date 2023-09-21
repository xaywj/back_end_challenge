import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import { Request } from 'express'; 
import { jwtConstants } from 'src/app/auth/jwtConstants';
import { Reflector } from '@nestjs/core'; 
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
 
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);   
    const roles = this.reflector.get('roles', context.getHandler());
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );  
      const hasRole = () => roles.some((role) => roles.includes(payload.role)); 
      if(!hasRole) throw new UnauthorizedException();
      request['user'] = payload; 
  } catch { 
      throw new UnauthorizedException();
  } 
  return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}