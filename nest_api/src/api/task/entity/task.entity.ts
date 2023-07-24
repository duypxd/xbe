import { CommentEntity } from '../../../api/comment/entity/comment.entity';
import { UserEntity } from '../../../api/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'todo' })
  status: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: number;

  @OneToMany(() => CommentEntity, (comment) => comment.task)
  comments: CommentEntity[];
}
