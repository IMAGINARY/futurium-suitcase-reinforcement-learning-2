/* eslint-disable no-console */

const PixiCompositeApp = require('./view-pixi/pixi-composite-app');
const ExploreExploitInteractive = require('./components/interactive-explore-exploit');
const RewardsInteractive = require('./components/interactive-rewards');
const MapEditorInteractive = require('./components/interactive-map-editor');
const runExhibit = require('./run-exhibit');
require('../sass/futurium-suitcase.scss');

const width = 1180;
const height = 820;
const tileWidth = 72;

const paddingX = 285;
const paddingY = 40;
const uiSpacing = 0;

runExhibit((config, textures) => {
  const app = new PixiCompositeApp(
    width,
    height,
    0xffffff,
    config.pixiOptions || {}
  );
  $('#pixi-app-container').append(app.getView());

  const mapEditorPanel = $('#map-editor-component').parent("[class*='tl-panel-']");
  const mapEditorInteractive = new MapEditorInteractive(config, textures);
  app.addComponent(mapEditorInteractive,
    mapEditorPanel.offset().left + paddingX + 0.25 + 180,
    mapEditorPanel.offset().top + paddingY + uiSpacing + 0.25,
    tileWidth * 8,
    tileWidth * 8
  );
  mapEditorInteractive.setupKeyControls();
  $('#palette').append(mapEditorInteractive.$element);
});
