
function Start(){
}

function Update(){
	if(Time.time > 5){
		var wave : SinWave = gameObject.AddComponent("SinWave");
		wave.amplitude = 50;
		wave.frequency = 2;	
	}
}