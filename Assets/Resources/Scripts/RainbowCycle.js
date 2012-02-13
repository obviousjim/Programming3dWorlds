public var materials : Material[];
public var holdOnColor : float;
private var lastChangedTime : float = 0;
private var currentColorIndex : int = 0;
function Update () {
	if(Time.time - lastChangedTime > holdOnColor){
		gameObject.GetComponent(MeshRenderer).sharedMaterial = materials[currentColorIndex % materials.length];
		currentColorIndex++;
		lastChangedTime = Time.time;
	}
}