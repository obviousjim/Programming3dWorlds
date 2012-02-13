//public var materials : Material[];
public var color1 : Color;
public var color2 : Color;
public var holdOnColor : float;
private var lastChangedTime : float = 0;
private var currentColorIndex : int = 0;
function Update () {
	var lerpValue : float = Time.time / 4.0;
	gameObject.GetComponent(MeshRenderer).sharedMaterial.SetColor("_Color", Color.Lerp(color1, color2, lerpValue) );
}