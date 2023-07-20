import { HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';

export function CustomApiResponse(isArray = false) {
  return ApiResponse({
    status: 200,
    description: 'OK',
    type: String,
    isArray: isArray,
  });
}

export function CustomApiBadRequestResponse() {
  return ApiBadRequestResponse({
    description: 'Bad request, wrong data input',
    status: HttpStatus.BAD_REQUEST,
  });
}

export function CustomApiUnauthorizedResponse() {
  return ApiUnauthorizedResponse({
    description: 'Unauthorized, token expired',
    status: HttpStatus.UNAUTHORIZED,
  });
}

export function CustomApiNotFoundResponse() {
  return ApiNotFoundResponse({
    description: 'Not found',
    status: HttpStatus.NOT_FOUND,
  });
}

export function CustomApiForbiddenResponse() {
  return ApiForbiddenResponse({
    description: 'Forbidden, wrong API key',
    status: HttpStatus.FORBIDDEN,
  });
}

export function CustomApiInternalServerErrorResponse() {
  return ApiInternalServerErrorResponse({
    description: 'Internal server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  });
}
