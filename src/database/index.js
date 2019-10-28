import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    // na linha abaixo utilizada para fazer o relacionamento entre FILE e USER
    // onde no model => model.associate estamos verificado para cada model se
    // ele possui essa função e model.associate(this.connection.models) é onde
    // estamos utilizando a função
  }
}

export default new Database();
