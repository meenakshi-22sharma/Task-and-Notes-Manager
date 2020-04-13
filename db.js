const Sequelize = require('sequelize');
const db= new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/taskDatabase.db'
  });


  const Tasks = db.define('task',{

    Id:{type: Sequelize.INTEGER,
        primaryKey: true},
    Title :{ type: Sequelize.STRING(40),
                allowNull : false
            },
    Description : { type: Sequelize.STRING(100)},
    Due_Date :{type: Sequelize.DATE},
    Status : {type: Sequelize.STRING(20)},
    Priority :{type: Sequelize.STRING(10)}

      
  })


  const Notes= db.define('note',{
      Note : {type: Sequelize.STRING(1000)}
  })



task.hasMany(note);
note.belongsTo(task); 