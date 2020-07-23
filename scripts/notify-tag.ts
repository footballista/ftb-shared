import { emoji } from '../shared/utils/emoji';
import { TgClient } from '../shared/utils/telegram';
import { getRepository } from '../shared/utils/repository';

const tgClient = new TgClient();

const notify = async () => {
  const repo = await getRepository();
  await tgClient.sendMessage(
    'channel',
    `${emoji.purple_heart} *SHARED COMPONENTS* new tag released. Do not forget to update dependencies in client projects.\n\n
changelog: https://github.com/${repo.owner}/${repo.name}/blob/master/CHANGELOG.md`,
  );
};

notify();
