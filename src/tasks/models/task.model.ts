import { Column, Model, Table, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  tableName: 'tasks',
  timestamps: true
})
export class Task extends Model<Task> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userID: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5, // Assuming priority is a scale from 1 to 5
    },
  })
  priority: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dueDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isCompleted: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  completedAt: Date;
}
