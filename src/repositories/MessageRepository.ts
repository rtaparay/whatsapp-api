import { EntityRepository, Repository, LessThanOrEqual, IsNull } from 'typeorm';

import Message from '../models/Message';

@EntityRepository(Message)
class MessagesRepository extends Repository<Message> {
  // public async findByDate(date: Date): Promise<Message | null> {
  //   const findMessage = await this.findOne({
  //     where: { date },
  //   });

  //   return findMessage || null;
  // }

  public async findMessagesToSend(): Promise<Message[]> {
    const findMessage = await this.find({
      where: [
        { schedule_date: LessThanOrEqual(new Date()), status: 'WAITING' },
        { schedule_date: IsNull(), status: 'WAITING' },
      ],
      take: 10,
      order: { id: 'DESC' },
    });

    return findMessage || null;
  }
}

export default MessagesRepository;
