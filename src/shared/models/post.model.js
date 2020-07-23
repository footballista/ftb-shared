import { AbstractModel } from './abstract.model';
import { Tag } from './tag.model';
import dayjs from 'dayjs';
import marked from 'marked';
export class Post extends AbstractModel {
  constructor(model) {
    super();
    this.title = '';
    this.body = '';
    this.plainBody = ''; // parsed body without tags
    this.bodyHTML = ''; // parsed body formatted in HTML
    this.tags = [];
    this.tokens = [];
    this.map(model || {}, {
      date: (model) => {
        this.date = dayjs(model.date);
      },
      tags: (model) => {
        this.tags = model.tags.map((t) => new Tag(t));
      },
      body: (model) => {
        this.body = model.body;
        try {
          const parsed = JSON.parse(model.body);
          //add recursive parsing for nested entities
          parsed.forEach((part) => {
            this.plainBody += part.text;
            this.bodyHTML += `<p>${part.text}</p>`; // todo add links and tags parsing
          });
        } catch (e) {
          // parsing JSON failed. It seems like plain body in old format
          this.plainBody = model.body;
          this.bodyHTML = `<p>${model.body}</p>`;
        }
      },
      relatedPosts: (model) => {
        this.relatedPosts = model.relatedPosts.map((p) => new Post(p));
      },
    });
    this.published = this.date < dayjs();
  }
  getTokens() {
    this.tokens = marked.lexer(this.body, { gfm: true });
  }
}
//# sourceMappingURL=post.model.js.map
