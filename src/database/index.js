import Sequelize from 'sequelize';

import mongoose from 'mongoose';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointments from '../app/models/Appointments';

import databaseConfig from '../config/database';

const models = [User, File, Appointments];

class Database {
  constructor() {
    this.init();
    this.mongo();
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

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
      }
    );
  }
}

export default new Database();
