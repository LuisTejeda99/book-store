import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

//Este nos va a ayudar a descifrar los valores de las injection de dependencias en tiempo de ejecucion
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //Con esto almacenamos los roles que hayan sido pasados en nuestro decorador
    const roles: string[] = this._reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    //Capturamos la solicitud que se esta enviando en ese momento
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    //En estos roles, está este role?
    const hasRole = () =>
      user.roles.some((role: string) => roles.includes(role));

    return user && user.roles && hasRole();
  }
}
