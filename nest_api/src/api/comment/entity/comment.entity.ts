import { TaskEntity } from '../../../api/task/entity/task.entity';
import { UserEntity } from '../../../api/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TaskEntity, (task) => task.comments)
  task: TaskEntity;

  @ManyToOne(() => TaskEntity, (task) => task.id)
  taskId: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: number;
}
