package lab1;

import java.util.Scanner;


public class P1 {

	public static void main(String[] args) {
		
		//1.)
		//check for BufferedReader object
		//check for System.console().readLine() 
		//check for java.util.Scanner and System.in
		Scanner reader = new Scanner(System.in);  // Reading from System.in
		
		System.out.println("Enter a Character: ");
		
		//2.) 
		//check for a char or a string variable that store user input
		char input =  reader.next().charAt(0);
		
		//3.)
		//check for switch statements in the code
		//check corresponding switch input
		switch(input){
		
		//4.)
		//check for switch cases 'a','A','c','C','d','D'
		//check for number of breaks;
		case 'a': 
			System.out.println("Action movie fan");
			break;
		case 'A': 
			System.out.println("Action movie fan");
			break;
		case 'c' :
			System.out.println("Comedy movie fan");
			break;
		case 'C' :
			System.out.println("Comedy movie fan");
			break;
		case 'd' :
			System.out.println("Drama movie fan");
		case 'D' :
			System.out.println("Drama movie fan");
			//check for default cases
			default : 
				System.out.println("Invalid choice");
				break;
	

		}
		//5.)
		//optional check for closing reader
		reader.close();
	}

}
