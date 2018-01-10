// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../lib/Renderer","../lib/SSAOHelperObscurance","../lib/ShadowMap","../lib/NearFarCalc","../lib/Util","../lib/gl-matrix","../lib/RenderPass","../lib/HighlightHelper","../lib/RenderOccludedHelper","../lib/OffscreenRenderingHelper"],function(e,t,s,r,a,i,n,o,h,d,p,l){var u=o.vec3d,_=o.mat4d,g=n.assert,c=function(){function e(e,t,n,o){this._drawShadowMapDebugQuad=!1,this._drawSSAOMapDebugQuad=!1,this._needsRender=!0,this._content={},this._rctx=o,this._renderer=new s(e,t,n,this._rctx,!1),this._programRep=e,this._nearFarCalc=new i,this._helpers={shadowMap:new a(e,this._rctx),ssao:new r(e,n,this._rctx,this.setNeedsRender.bind(this)),highlight:new d(e,n,this._rctx),renderOccluded:new p(e,n,this._rctx),offscreenRendering:new l(e,this._rctx)}}return e.prototype.getCombinedStats=function(){return this._renderer.getCombinedStats()},e.prototype.dispose=function(){this._renderer.dispose(),this._helpers.shadowMap.getEnableState()&&this._helpers.shadowMap.setEnableState(!1),this._helpers.shadowMap.dispose(),this._helpers.ssao.getEnableState()&&this._helpers.ssao.setEnableState(!1),this._helpers.ssao.dispose(),this._helpers.highlight.getEnableState()&&this._helpers.highlight.setEnableState(!1),this._helpers.renderOccluded.getEnableState()&&this._helpers.renderOccluded.setEnableState(!1),this._helpers.offscreenRendering.getEnableState()&&this._helpers.offscreenRendering.setEnableState(!1)},e.prototype.setLighting=function(e){this._renderer.setLighting(e)},e.prototype.getViewParams=function(e){var t=e||{};return(!e||e.pixelRatio)&&(t.pixelRatio=this._renderer.getPixelRatio()),t},e.prototype.setViewParams=function(e){null!=e.pixelRatio&&this._renderer.setPixelRatio(e.pixelRatio)},e.prototype.setRenderParams=function(e){void 0!==e.shadowMapResolution&&this._helpers.shadowMap.getEnableState()===!1&&this._helpers.shadowMap.setTextureResolution(e.shadowMapResolution),void 0!==e.shadowMap&&e.shadowMap!==this._helpers.shadowMap.getEnableState()&&this._helpers.shadowMap.setEnableState(e.shadowMap),void 0!==e.shadowMapMaxCascades&&this._helpers.shadowMap.setMaxNumCascades(e.shadowMapMaxCascades),!0!==this._helpers.highlight.getEnableState()&&this._helpers.highlight.setEnableState(!0),void 0!==e.ssao&&e.ssao!==this._helpers.ssao.getEnableState()&&this._helpers.ssao.setEnableState(e.ssao),void 0!==e.ssaoAttenuation&&this._helpers.ssao.setAttenuation(e.ssaoAttenuation),void 0!==e.ssaoRadius&&this._helpers.ssao.setRadius(e.ssaoRadius),void 0!==e.ssaoFilterRadius&&console.error("The property ssaoFilterRadius is no longer supported as a render parameter."),void 0!==e.ssaoSamples&&this._helpers.ssao.setSamples(e.ssaoSamples),void 0!==e.drawShadowMapDebugQuad&&(this._drawShadowMapDebugQuad=e.drawShadowMapDebugQuad),void 0!==e.drawSSAODebugQuad&&(this._drawSSAOMapDebugQuad=e.drawSSAODebugQuad),this._helpers.ssao.getEnableState()?this._renderer.ssaoEnabled=!0:this._renderer.ssaoEnabled=!1,void 0!==e.offscreenRendering&&e.offscreenRendering!==this._helpers.offscreenRendering.getEnableState()&&this._helpers.offscreenRendering.setEnableState(e.offscreenRendering),void 0!==e.antialiasingEnabled&&(e.antialiasingEnabled?this._renderer.renderOptions.antialiasing="smaa":this._renderer.renderOptions.antialiasing="none"),void 0!==e.earlyOcclusionPixelDraw&&(this._renderer.renderOptions.earlyOcclusionPixelDraw=e.earlyOcclusionPixelDraw),void 0!==e.defaultHighlightOptions&&this._helpers.highlight.setDefaultOptions(e.defaultHighlightOptions),this._needsRender=!0},e.prototype.getRenderParams=function(){var e={};return this._helpers.shadowMap.getIsSupported()&&(e.shadowMap=this._helpers.shadowMap.getEnableState(),e.shadowMapResolution=this._helpers.shadowMap.getTextureResolution(),e.shadowMapMaxCascades=this._helpers.shadowMap.getMaxNumCascades()),this._helpers.ssao.getIsSupported()&&(e.ssao=this._helpers.ssao.getEnableState(),e.ssaoAttenuation=this._helpers.ssao.getAttenuation(),e.ssaoRadius=this._helpers.ssao.getRadius(),e.ssaoFilterRadius=this._helpers.ssao.getFilterRadius(),e.ssaoSamples=this._helpers.ssao.getSamples()),e},e.prototype.modify=function(e,t,s,r){this._renderer.modify(e,t,s,r);for(var a=0;a<t.length;++a)delete this._content[t[a].uniqueName];for(var a=0;a<e.length;++a)this._content[e[a].uniqueName]=e[a];for(var a=0;a<s.length;++a)g(this._content[s[a].renderGeometry.uniqueName]===s[a].renderGeometry)},e.prototype.getContent=function(){return this._content},e.prototype.getPickRay=function(e,t,s,r,a,i){u.unproject(u.createFrom(e[0],e[1],0),r,s.projectionMatrix,s.fullViewport,a),u.unproject(u.createFrom(e[0],e[1],1),r,s.projectionMatrix,s.fullViewport,i)},e.prototype.getProjectionMatrix=function(e,t,s,r,a){var i=n.fovx2fovy(t,e[2],e[3]);_.perspective(180*i/Math.PI,e[2]/e[3],s,r,a)},e.prototype.addExternalRenderer=function(e,t){return this._renderer.addExternalRenderer(e,t)},e.prototype.removeExternalRenderer=function(e){return this._renderer.removeExternalRenderer(e)},e.prototype.getExternalRenderers=function(){return this._renderer.getExternalRenderers()},e.prototype.resetNeedsRender=function(){this._needsRender=!1,this._renderer.resetNeedsRender()},e.prototype.needsRender=function(){return this._needsRender||this._renderer.needsRender()},e.prototype.setNeedsRender=function(){this._needsRender=!0},e.prototype.render=function(e,t,s){var r,a=e.viewport;if(this._helpers.shadowMap.getEnableState()){r=this._nearFarCalc.calculateSceneNearFar(e,this._content),this._helpers.shadowMap.prepare(e,t,this._content,r);for(var i=this._helpers.shadowMap.getCascades(),n=0;n<i.length;++n){var o=i[n];o.camera.setGLViewport(this._rctx),this._renderer.renderGeometryPass(h.MATERIAL_DEPTH_SHADOWMAP,o.camera)}this._helpers.shadowMap.finish(s),e.setGLViewport(this._rctx)}if(this._helpers.shadowMap.bindAll(this._programRep),this._renderer.renderAuxiliaryBuffers(e,s,this._helpers),this._renderer.render(e,s,this._helpers),this._drawShadowMapDebugQuad&&this._helpers.shadowMap.getEnableState()){var d=_.ortho(a[0],a[2],a[1],a[3],-1,1);this._helpers.shadowMap.drawDebugQuad(d)}if(this._drawSSAOMapDebugQuad&&this._helpers.ssao.getEnableState()){var d=_.ortho(a[0],a[2],a[1],a[3],-1,1);this._helpers.ssao.drawQuad(d)}},e}();return c});