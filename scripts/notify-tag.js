import { emoji } from '../shared/utils/emoji';
const tgClient = new TgClient();

const notify = async () => {
  await tgClient.sendMessage(
    'channel',
    `${emoji.purple_heart} *SHARED COMPONENTS* new tag released. Do not forget to update dependencies in client projects.\n\n
changelog: https://github.com/${repo.owner}/${repo.name}/blob/master/CHANGELOG.md`,
  );
};

notify();
