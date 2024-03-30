export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","copy-success.svg","copy.svg","favicon.png","post-01-img01.jpg","post-01-img02.png","yellowed.json"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.6wF-uLxr.js","app":"_app/immutable/entry/app.Cdu_c1bD.js","imports":["_app/immutable/entry/start.6wF-uLxr.js","_app/immutable/chunks/entry.Db5zvg1c.js","_app/immutable/chunks/scheduler.DamSiY5E.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.Cdu_c1bD.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.DamSiY5E.js","_app/immutable/chunks/index.DjKXAdKE.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
