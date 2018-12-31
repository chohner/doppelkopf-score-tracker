(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{232:function(e,n,t){e.exports=t(407)},237:function(e,n,t){},239:function(e,n,t){},394:function(e,n,t){e.exports=t.p+"static/media/logo.62486c72.svg"},407:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(59),o=t.n(l),i=(t(237),t(64)),c=t(26),s=t(27),m=t(29),p=t(28),u=t(30),h=(t(239),t(425)),d=t(427),g=t(201),w=t(124),y=t(421),E=function(e){return r.a.createElement(y.a,{basic:!0,trigger:e.trigger,centered:!1},r.a.createElement(y.a.Header,null,"Help"),r.a.createElement(y.a.Content,null,r.a.createElement(y.a.Description,null,r.a.createElement("p",null,"You can add a game by entering the game score and winners. Solos points are calculated automatically."),r.a.createElement("p",null,"You can edit a previous game by clicking on the corresponding score and hitting the edit icon. It will populate the bottom row, adding the game will edit in place."),r.a.createElement("p",null,"You can edit player names by clicking on them."))))},f=t(426),b=t(424),v=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(m.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(r)))).state={resetPopupOpen:!1},t.handleClick=function(){t.setState({resetPopupOpen:!1}),t.props.onReset()},t.handleOpen=function(){t.setState({resetPopupOpen:!0})},t.handleClose=function(){t.setState({resetPopupOpen:!1})},t}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement(f.a,{name:"resetPopup",hideOnScroll:!0,open:this.state.resetPopupOpen,onClose:this.handleClose,onOpen:this.handleOpen,trigger:this.props.trigger,content:r.a.createElement(b.a,{color:"red",name:"reset",content:"Confirm reset",onClick:this.handleClick}),on:"click"})}}]),n}(a.Component),C=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(m.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(r)))).handleResetClick=function(){t.props.onReset()},t}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement(h.a,{secondary:!0},r.a.createElement(h.a.Item,{content:r.a.createElement("img",{src:t(394),alt:"logo"})}),r.a.createElement(h.a.Item,{content:r.a.createElement(d.a,{as:"h3",content:"Doko Butler"})}),r.a.createElement(E,{trigger:r.a.createElement(h.a.Item,{name:"help",content:"Help"})}),r.a.createElement(v,{onReset:this.handleResetClick,trigger:r.a.createElement(h.a.Item,{position:"right",content:r.a.createElement(g.a,{basic:!0,color:"red"},r.a.createElement(w.a,{name:"delete"})," Reset")})}))}}]),n}(a.Component),O=t(422),k=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(m.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(r)))).handleItemClick=function(e){t.props.onChange(e)},t}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this,n=this.props.gamePoints,t=n.soloWon||n.soloLost?"".concat(3*n.points," / ").concat(n.points):n.points,a={borderTop:n.gameid%4!==0?void 0:"solid 2px gray"};return r.a.createElement(O.a.Row,{style:a},n.cumulativeScore.map(function(e,n){return r.a.createElement(O.a.Cell,{content:e.score,key:n,selectable:!0,positive:e.winner,negative:!e.winner})}),r.a.createElement(f.a,{hideOnScroll:!0,trigger:r.a.createElement(O.a.Cell,{content:t}),content:r.a.createElement(w.a,{name:"edit outline",onClick:function(){return e.handleItemClick(n.gameid)}}),on:"click",position:"top center"}))}}]),n}(a.Component),j=function(e){function n(){return Object(c.a)(this,n),Object(m.a)(this,Object(p.a)(n).apply(this,arguments))}return Object(u.a)(n,e),Object(s.a)(n,[{key:"gameToResultPoints",value:function(e){var n=1===e.winner.length,t=3===e.winner.length,a=[{},{},{},{}];return a.forEach(function(r,l){e.winner.includes(l)?(a[l].score=n?3*e.points:e.points,a[l].winner=!0):(a[l].score=t?-3*e.points:-e.points,a[l].winner=!1)}),{playerPoints:a,soloWon:n,soloLost:t}}},{key:"gameListToPointList",value:function(e){var n=this,t=[];return e.forEach(function(e,a){var r=n.gameToResultPoints(e),l=r.playerPoints,o=r.soloWon,i=r.soloLost,c=l.map(function(e,n){var r=l[n];return 0!==a&&(r.score+=t[a-1].cumulativeScore[n].score),r});t.push({gameid:e.gameid,points:e.points,soloWon:o,soloLost:i,cumulativeScore:c})}),t}},{key:"render",value:function(){var e=this,n=this.gameListToPointList(this.props.games);return r.a.createElement(O.a.Body,null,n.map(function(n,t){return r.a.createElement(k,{key:t,gamePoints:n,onChange:e.props.onChange})}))}}]),n}(a.Component),G=t(420),P=t(417),S=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(m.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(r)))).handleChange=function(e){var n=Object(i.a)(t.props.players);n[e.target.id].name=e.target.value,t.props.onChange(n)},t}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e={textAlign:"center",fontWeight:"bold"};return r.a.createElement(O.a.Header,null,r.a.createElement(O.a.Row,null,r.a.createElement(O.a.HeaderCell,null,r.a.createElement(G.a,null,r.a.createElement(P.a,{transparent:!0,type:"text",placeholder:"Player 1",id:0,value:this.props.players[0].name,onChange:this.handleChange},r.a.createElement("input",{style:e})))),r.a.createElement(O.a.HeaderCell,null,r.a.createElement(G.a,null,r.a.createElement(P.a,{transparent:!0,type:"text",placeholder:"Player 2",id:1,value:this.props.players[1].name,onChange:this.handleChange},r.a.createElement("input",{style:e})))),r.a.createElement(O.a.HeaderCell,null,r.a.createElement(G.a,null,r.a.createElement(P.a,{transparent:!0,type:"text",placeholder:"Player 3",id:2,value:this.props.players[2].name,onChange:this.handleChange},r.a.createElement("input",{style:e})))),r.a.createElement(O.a.HeaderCell,null,r.a.createElement(G.a,null,r.a.createElement(P.a,{transparent:!0,type:"text",placeholder:"Player 4",id:3,value:this.props.players[3].name,onChange:this.handleChange},r.a.createElement("input",{style:e})))),r.a.createElement(O.a.HeaderCell,null,"Game")))}}]),n}(a.Component),I=t(416),H=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(m.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(r)))).handleFocus=function(e){var n=e.currentTarget;setTimeout(function(){n.select()},0)},t.handleWinnerInput=function(e,n){var a=Object(i.a)(t.props.newGame.winner);a[n.playerid]=n.checked,t.props.onChange({winner:a})},t.handlePointInput=function(e,n){t.props.onChange({points:n.value})},t.handlePointSubmit=function(e,n){var a=Number(t.props.newGame.points),r=0===a,l=[];t.props.newGame.winner.forEach(function(e,n){e&&l.push(n)}),r&&0!==l.length?console.warn("Null game must have zero winners."):0!==l.length||r?l.length>3?console.warn("Can't have more than 3 winners."):t.props.onSubmit({gameid:t.props.newGame.gameid,winner:l,points:a}):console.warn("Zero winners must be nullgame.")},t}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement(O.a.Footer,{fullWidth:!0},r.a.createElement(O.a.Row,null,r.a.createElement(O.a.HeaderCell,null,r.a.createElement(I.a,{playerid:"0",checked:this.props.newGame.winner[0],onChange:this.handleWinnerInput})),r.a.createElement(O.a.HeaderCell,null,r.a.createElement(I.a,{playerid:"1",checked:this.props.newGame.winner[1],onChange:this.handleWinnerInput})),r.a.createElement(O.a.HeaderCell,null,r.a.createElement(I.a,{playerid:"2",checked:this.props.newGame.winner[2],onChange:this.handleWinnerInput})),r.a.createElement(O.a.HeaderCell,null,r.a.createElement(I.a,{playerid:"3",checked:this.props.newGame.winner[3],onChange:this.handleWinnerInput})),r.a.createElement(O.a.HeaderCell,null,r.a.createElement(P.a,{fluid:!0,size:"mini",type:"number",pattern:"\\d*",max:50,min:0,action:r.a.createElement(b.a,{compact:!0,color:"teal",icon:"add",size:"mini",onClick:this.handlePointSubmit}),onFocus:this.handleFocus,onChange:this.handlePointInput,value:this.props.newGame.points,placeholder:"Points"}))))}}]),n}(a.Component),R=t(428),W=t(418),x=t(419),A=t(423),L=function(){return r.a.createElement(R.a,{style:{margin:"5em 0em 0em",padding:"5em 0em"},vertical:!0},r.a.createElement(W.a,{textAlign:"center"},r.a.createElement(x.a,{section:!0}),r.a.createElement(A.a,{horizontal:!0,divided:!0,link:!0,size:"small"},r.a.createElement(A.a.Item,{content:"".concat("doko_butler"," ").concat("0.1.0")}),r.a.createElement(A.a.Item,{as:"a",href:"https://github.com/chohner/doko-butler",target:"_blank"},r.a.createElement(w.a,{name:"github"})," github"),r.a.createElement(A.a.Item,{as:"a",href:"https://chohner.com",target:"_blank",content:"made by chohner"}))))},T=t(34),z=t.n(T);function N(){return{players:[{id:0,name:"Player 1"},{id:1,name:"Player 2"},{id:2,name:"Player 3"},{id:3,name:"Player 4"}],games:[],newGame:{gameid:0,winner:[!1,!1,!1,!1],points:""}}}var F=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=Object(m.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(r)))).state={players:z.a.get("players")||[{id:0,name:"Player 1"},{id:1,name:"Player 2"},{id:2,name:"Player 3"},{id:3,name:"Player 4"}],games:z.a.get("games")||[],newGame:z.a.get("newGame")||{gameid:0,winner:[!1,!1,!1,!1],points:""}},t.emptyState=N,t.handlePlayerChange=function(e){t.setState({players:e}),z.a.set("players",e)},t.handleGameAdded=function(e){var n=Object(i.a)(t.state.games);e.gameid>t.state.games.length-1?n.push({gameid:t.state.games.length,winner:e.winner,points:e.points}):n[e.gameid]={gameid:e.gameid,winner:e.winner,points:e.points},t.setState({games:n}),z.a.set("games",n),t.resetNewGame(n.length)},t.handleNewGameChange=function(e){var n=t.state.newGame;void 0!==e.winner?n.winner=e.winner:void 0!==e.points&&(n.points=e.points),t.setState({newGame:n}),z.a.set("newGame",n)},t.resetNewGame=function(e){var n=t.emptyState();n.newGame.gameid=e,t.setState({newGame:n.newGame}),z.a.set("newGame",n.newGame)},t.handleReset=function(){var e=t.emptyState();t.setState(e),z.a.set("players",e.players),z.a.set("games",e.games),z.a.set("newGame",e.newGame)},t.handleGameChange=function(e){var n=t.state.games[e],a={gameid:e,winner:[!1,!1,!1,!1],points:n.points};n.winner.forEach(function(e){a.winner[e]=!0}),t.setState({newGame:a})},t}return Object(u.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this.state,n=e.players,t=e.games,a=e.newGame;return r.a.createElement(r.a.Fragment,null,r.a.createElement(C,{onReset:this.handleReset}),r.a.createElement(O.a,{fixed:!0,selectable:!0,unstackable:!0,columns:5,striped:!0,textAlign:"center",size:"small",style:{borderCollapse:"collapse"}},r.a.createElement(S,{players:n,onChange:this.handlePlayerChange}),r.a.createElement(j,{games:t,onChange:this.handleGameChange}),r.a.createElement(H,{newGame:a,onChange:this.handleNewGameChange,onSubmit:this.handleGameAdded})),r.a.createElement(L,null))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(404);o.a.render(r.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[232,2,1]]]);
//# sourceMappingURL=main.50d538a8.chunk.js.map