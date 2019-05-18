using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class TapController : MonoBehaviour{

	public delegate void PlayerDelegate();
	public static event PlayerDelegate OnPlayerDied;
	public static event PlayerDelegate OnPlayerScored;	

	public float tapForce = 10;
	public float tiltSmooth= 5;
	public Vector3 startPos;

	
 
	Rigidbody2D rigidbody;
	Quaternion downRotation;
	Quaternion forwardRotation;
	

	void Start(){
		rigidbody = GetComponent<Rigidbody2D>();
		downRotation = Quaternion.Euler(0,0,-20);
		forwardRotation = Quaternion.Euler(0,0,35);
	}

	void OnEnable(){
		GameManager.OnGameStarted += OnGameStarted;
		GameManager.OnGameOverConfirmed += OnGameOverConfirmed;
	}

	void OnDisable(){
		GameManager.OnGameStarted -= OnGameStarted;
		GameManager.OnGameOverConfirmed -= OnGameOverConfirmed;
	}
	
	void OnGameStarted(){
		rigidbody.velocity = Vector3.zero;
		rigidbody.simulated = true;
	}

	void OnGameOverConfirmed(){
		transform.localPosition = startPos;
		transform.rotation = Quaternion.identity;
		rigidbody.simulated = false;
	}
	void Update(){
		if(Input.GetMouseButtonDown(0) && (rigidbody.simulated == true) ){
		rigidbody.simulated = true;
		transform.rotation=forwardRotation;
		rigidbody.AddForce(Vector2.up*tapForce,ForceMode2D.Force);
		OnPlayerScored();
		//play audio	
		
		
		}
		
		transform.rotation = Quaternion.Lerp(transform.rotation,downRotation,tiltSmooth*Time.deltaTime);
	}

	void OnTriggerEnter2D(Collider2D col){
		if(col.gameObject.tag == "DeadZone"){
			rigidbody.simulated = false;	
			OnPlayerDied(); // event sent to  GameManager
			//Play audio
				
		}

		if(col.gameObject.tag == "base"){
			rigidbody.simulated = false;
			rigidbody.velocity = Vector3.zero;
			OnPlayerScored(); //event sent to GameManager		
		}
		
	}
}
