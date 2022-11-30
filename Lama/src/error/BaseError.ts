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

export class BandNotFound extends BaseError {
  constructor(){
    super(404, "Banda não encontrado!")
  }
}

export class InvalidDate extends BaseError {
  constructor(){
    super(412, "As datas disponíveis são Sexta,Sabado e Domingo!")
  }
}

export class UnavailableTime extends BaseError {
  constructor(){
    super(412, "Os horários disponiveis são das 08h as 23h")
  }
}

export class ShowAlreadyExists extends BaseError {
  constructor(){
    super(409, "Registro de show em horário já existente.")
  }
}

export class ShowsNotFound extends BaseError {
  constructor(){
    super(404, "Registro de shows não encontrados.")
  }
}