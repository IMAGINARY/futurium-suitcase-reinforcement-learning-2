/* eslint-disable no-console */

const PixiCompositeApp = require('./view-pixi/pixi-composite-app');
const ExploreExploitInteractive = require('./components/interactive-explore-exploit');
const RewardsInteractive = require('./components/interactive-rewards');
const MapEditorInteractive = require('./components/interactive-map-editor');
const runExhibit = require('./run-exhibit');
require('../sass/futurium-suitcase.scss');

import AppScaler from './helpers-html/app-scaler';

const width = 1180;
const height = 820;
const tileWidth = 72;
const backgroundColor = 0x000000;

const paddingX = 500;
const paddingY = 60;
const uiSpacing = 0;

runExhibit((config, textures) => {
  const scaler = new AppScaler($('.app-scaler')[0], width, height);
  const app = new PixiCompositeApp(
    width,
    height,
    backgroundColor,
    config.pixiOptions || {}
  );
  $('#pixi-app-container').append(app.getView());

  const mapEditorPanel = $('#map-editor-component').parent("[class*='tl-panel-']");
  const mapEditorInteractive = new MapEditorInteractive(config, textures);
  app.addComponent(mapEditorInteractive,
    mapEditorPanel.offset().left + paddingX + 0.25,
    mapEditorPanel.offset().top + paddingY + uiSpacing + 0.25,
    tileWidth * 8,
    tileWidth * 8
  );
  mapEditorInteractive.setupKeyControls();
  $('#palette').append(mapEditorInteractive.$element);
});
