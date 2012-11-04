var AssetManager =  function(manifest){
	var manifest = manifest || []
	var map = {}
	var errors = []
	var progress = 0;
	var onfinish = function() { return true; };
	var onprogress = function() { return true; };
	
	var setManifest = function(queue){
		manifest = queue
	}
	
	var addToManifest  = function(path){
		manifest.push(path)
	}
	
	var getItem = function(path){
		return map[path];
	}
	var getMap = function(){
		return map;
	}
	
	var setProgress = function(count){
		prog = Math.round((count * 100)/manifest.length); 
	}
	
	var onfinish = function(callback){
		onfinish = callback;
	}
	var onprogress = function(callback){
		onprogress = callback;
	}
	
	var loadAssets = function(){
		if(manifest.length ===0) finish()
		var count = 1;
		var tmpImg;
		for(var i in manifest ){
			tmpImg = new Image();
			tmpImg.src = manifest[i];
			tmpImg.onload = function(){
				map[manifest[i]] = tmpImg //load to cache
				//prog = Math.round((count * 100)/manifest.length);
				setProgress(count)
				onprogress(prog);
				count++;
				if(count-1 == manifest.length) onfinish();
			}
			
 			tmpImg.onerror = function(){
				//prog = Math.round((count * 100)/manifest.length);
				setProgress(count)
				onprogress(prog);
				count++;
				errors.push(tmpImg.src)
				if(count-1 == manifest.length) onfinish(errors);
			}
		}
	}
	
	// Define which variables and methods can be accessed
    return {
		getItem : getItem,
        getMap: getMap,
		loadAssets: loadAssets,
		setManifest: setManifest,
		addToManifest: addToManifest,
		onprogress:onprogress,
		onfinish:onfinish
    }
}