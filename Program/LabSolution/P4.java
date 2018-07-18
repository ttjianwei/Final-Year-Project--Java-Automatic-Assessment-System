package lab1;

import java.util.Scanner;

public class P4 {

	

	public static void main(String[] args) {
		
		//1.) Check for reading input from user
		Scanner reader = new Scanner(System.in); 
		System.out.println("Enter Height: ");
		//2.) Check for storing use input
		int height =  reader.nextInt();
		String output = "";
		if(height!=0){
		//3.)
		//check for algorithm - loops
		for(int i=0; i<height; i++){
			if(i%2==0){
				output ="AA" + output;
			}
			else {
				output = "BB" + output;
			}
			
			//check for output
			System.out.println(output);
		}
		}
		else 
			System.out.println("height = " + height + " - Error Input!");
		
	}
}
