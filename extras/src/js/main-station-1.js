/* eslint-disable no-console */

const PixiCompositeApp = require('./view-pixi/pixi-composite-app');
const ExploreExploitInteractive = require('./components/interactive-explore-exploit');
const RewardsInteractive = require('./components/interactive-rewards');
const runExhibit = require('./run-exhibit');
require('../sass/futurium-suitcase.scss');
const ReactionController = require('./view-html/reaction-controller');

import AppScaler from './helpers-html/app-scaler';

const width = 1180;
const height = 820;
const tileWidth = 72;
const backgroundColor = 0x000000;

runExhibit((config, textures) => {
  const scaler = new AppScaler($('.app-scaler')[0], width, height);
  const app = new PixiCompositeApp(
    width,
    height,
    backgroundColor,
    config.pixiOptions || {}
  );
  $('#pixi-app-container').append(app.getView());

  const paddingX = 500;
  const paddingY = 40;
  const uiSpacing = 100;

  const rewardsPanel = $('#rewards-component').parent("[class*='tl-panel-']");
  const rewardsInteractive = new RewardsInteractive(config, textures);
  $('#rewards-bar').append(rewardsInteractive.$barContainer);
  $('#rewards-ui').append(rewardsInteractive.ui.$element);
  app.addComponent(rewardsInteractive,
    rewardsPanel.offset().left + paddingX + 0.25,
    rewardsPanel.offset().top + uiSpacing + paddingY + 0.25,
    tileWidth * 8,
    tileWidth
  );

  const exploreExploitPanel = $('#explore-exploit-component').parent("[class*='tl-panel-']");
  const exploreExploitInteractive = new ExploreExploitInteractive(config, textures);
  app.addComponent(exploreExploitInteractive,
    exploreExploitPanel.offset().left + paddingX + 0.25,
    exploreExploitPanel.offset().top + paddingY + 0.25,
    tileWidth * 8,
    tileWidth * 2
  );
  $('#explore-exploit-ui').append(exploreExploitInteractive.ui.$element);

  const reactionController = new ReactionController($('body'), config);
  rewardsInteractive.view.robotView.events.on('reactEnd', (animation) => {
    const bounds = rewardsInteractive.view.robotView.sprite.getBounds();
    reactionController.launchReaction(
      animation.reaction,
      bounds.x,
      bounds.y - bounds.height / 2
    );
  });
  exploreExploitInteractive.view.robotView.events.on('reactEnd', (animation) => {
    const bounds = exploreExploitInteractive.view.robotView.sprite.getBounds();
    reactionController.launchReaction(
      animation.reaction,
      bounds.x,
      bounds.y - bounds.height / 2
    );
  });
});
