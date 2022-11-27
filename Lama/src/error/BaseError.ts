export class BaseError extends Error {
  constructor(public code: number, message: string, ) {
    super(message);
  }
}

export class EmptyFields extends BaseError {
  constructor() {
    super(422, "Campos obrigatórios faltando.")
  }
}

export class InvalidEmail extends BaseError { 
  constructor() {
    super(400, "Email inválido. Digite o e-mail da seguinte maneira (email@email.com).")
  }
}

export class InvalidNameLength extends BaseError {
  constructor() {
    super(422, "Tamanho do nome deve ser maior ou igual a 3.");
  }
}

export class InvalidPassword extends BaseError { 
  constructor() {
    super(400, "Senha inválida.")
  }
}

export class Unauthorized extends BaseError {
  constructor() {
    super(401, "Usuário não autorizado.")
  }
}
  