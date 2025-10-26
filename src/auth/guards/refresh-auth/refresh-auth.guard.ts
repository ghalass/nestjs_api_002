import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh-jwt') {}
