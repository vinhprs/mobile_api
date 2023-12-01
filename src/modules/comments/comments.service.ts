import { Injectable } from '@nestjs/common';
import { AxiosRequestYoutube } from 'src/shared/dtos';
import { ApiService } from 'src/shared/providers';
import { LectureService } from '../course/providers';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  PATH: string = '/commentThreads';
  DOMAIN: string = 'https://www.googleapis.com/youtube/v3';
  KEY: string = 'AIzaSyCXgdDPtFNj4-HhXNcXgUV-hHDPjduv6mo';
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly api: ApiService,
    private readonly lectureService: LectureService
  ) {}

  async getComments()
  : Promise<any> {
    const lectures = await this.lectureService.getAll();
    const dump = lectures.slice(3000);
    await Promise.all(
      dump.map(async (lecture) => {
        console.log("lecture:", lecture._id)
        const query: AxiosRequestYoutube = {
          key: this.KEY,
          part: 'snippet',
          videoId: lecture.url,
          maxResults: 11
        }
        const comments = await this.api.videoYoutube(
          this.DOMAIN,
          this.PATH,
          query
        );
        const bulkComment: any[] =  [];
        comments?.items?.map(async (cmt: any, index: number) => {
          if(index !== 0) {
              const data = cmt.snippet.topLevelComment.snippet;
              const newComment = this.commentRepository.create({
                author: data.authorDisplayName,
                authorThumbnail: data.authorProfileImageUrl,
                content: data.textDisplay,
                lecture
              })
              bulkComment.push(newComment);
            }
          })
        await this.commentRepository.save(bulkComment);
      })
    )
    
    return "success"
  }
}
