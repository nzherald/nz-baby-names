!function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};window.Gridmap=function(){function e(e){var r=this;this.element=e,this.onResize=t(this.onResize,this),this.setMedia=t(this.setMedia,this),this.svg=d3.select(this.element).append("svg"),this.yearTitles=this.svg.append("g").attr("class","year-title").attr("transform","translate(100,0)"),this.yearTitles.selectAll("text").data(App.years).enter().append("text").on("click",function(t){return r.order_year=r.order_year===t?null:t,r.redraw()}),this.yearTitles.append("title").text("Click to order by year"),this.width_scale=d3.scale.ordinal().domain(App.years),this.paper=this.svg.append("g"),$(window).on("snap",this.setMedia),$(window).on("resize",this.onResize),$(window).trigger("resize")}return e.prototype.block_height=20,e.prototype.top_margin=20,e.prototype.tooltip=_.template("<strong>Rank:</strong> <%= rank %><br />\n<strong>Number:</strong> <%= number %><br />"),e.prototype.setMedia=function(t,e){return this.media=function(){switch(e.minWidth){case 0:return"xs";case 768:return"sm";case 992:return"md";case 1200:return"lg"}}(),this.svg.attr("data-media",this.media)},e.prototype.onResize=function(){return"xs"===this.media||this.previous_media!==this.media?(this.redraw(),this.previous_media=this.media):void 0},e.prototype.setShades=function(){var t=this;return this.shades={},this.year_data=d3.nest().key(function(t){return t.year}).entries(this.data),this.year_data.forEach(function(e){return t.shades[e.key]=d3.scale.linear().range(["#fff",t.color]).domain(d3.extent(_(e.values).collect(function(t){return parseInt(t.number,10)})))})},e.prototype.redraw=function(){var t,e,r,a,n,s,i,l=this;return this.width=parseInt(d3.select(this.element).style("width"),10),i="xs"===this.media?40:20,this.svg.attr("width",this.width),this.paper.attr("transform","translate(0,"+i+")"),a="xs"===this.media?this.width-120:this.width-200,this.width_scale.rangeRoundBands([0,a],0),this.yearTitles.selectAll("text").text(function(t){return t}).style("font-weight",function(t){return t===l.order_year?"bold":void 0}),null!=this.order_year&&(r=this.data.filter(function(t){return parseInt(t.year,10)===l.order_year}),r.sort(function(t,e){return parseInt(e.number,10)-parseInt(t.number,10)}),e=r.map(function(t){return t.name})),s=this.paper.selectAll("g.row"),n=100,s.attr("transform",function(t,r){return null!=e&&(r=e.indexOf(t.key),0>r&&(r=n,n+=1)),"translate(0, "+r*l.block_height+")"}),s.selectAll("text.left-text").text(function(t){return t.key}).style("fill",this.color).attr("y",this.block_height/2).attr("transform","translate(90, 0)"),s.selectAll("text.right-text").text(function(t){return t.key}).style("fill",this.color).attr("y",this.block_height/2).attr("transform","translate("+(this.width-90)+",0)"),t=s.selectAll("g.cell"),t.attr("transform",function(t){return"translate("+(l.width_scale(t.key)+100)+",0)"}).attr("data-toggle","popover").attr("data-trigger","hover").attr("data-container","body").attr("data-placement","top").attr("data-html","true").attr("data-title",function(t){return""+t.values[0].name+" - "+t.values[0].year}).attr("data-content",function(t){return l.tooltip(t.values[0])}),t.selectAll("rect").attr("height",this.block_height).attr("width",this.width_scale.rangeBand()).style("fill",function(t){return l.shades[t.key](parseInt(t.values[0].number,10))}),t.selectAll("text.rank_status").text(function(t){return 1===parseInt(t.values[0].rank,10)?"★":""}).attr("x",this.width_scale.rangeBand()/2).attr("y",this.block_height/2),$("[data-toggle=popover]").popover(),"xs"===this.media?(s.selectAll("text.right-text").style("visibility","hidden"),this.yearTitles.selectAll("text").attr("transform",function(t){return"translate("+(l.width_scale(t)+l.width_scale.rangeBand()/2)+", 20)rotate(90)"}).style("dominant-baseline","middle")):(s.selectAll("text.right-text").style("visibility","visible"),this.yearTitles.selectAll("text").attr("transform",function(t){return"translate("+(l.width_scale(t)+l.width_scale.rangeBand()/2)+", 0)"}).style("dominant-baseline","hanging"))},e.prototype.updateData=function(t,e){var r,a,n,s,i;return this.data=t,this.color=null!=e?e:"#000",this.setShades(),a=d3.nest().key(function(t){return t.name}).sortKeys(d3.ascending).key(function(t){return t.year}).sortKeys(d3.ascending).entries(this.data),this.svg.attr("height",a.length*this.block_height+this.top_margin),i=this.paper.selectAll("g.row").data(a,function(t){return t.key}),s=i.enter().append("g").attr("class","row"),s.append("text").attr("class","left-text"),s.append("text").attr("class","right-text"),i.exit().remove(),r=i.selectAll("g.cell").data(function(t){return t.values},function(t){return t.key}),n=r.enter().append("g").attr("class","cell"),n.append("rect"),n.append("text").attr("class","rank_status"),r.exit().remove(),this.redraw()},e}()}.call(this);