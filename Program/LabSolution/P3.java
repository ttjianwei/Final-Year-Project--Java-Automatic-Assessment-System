package lab1;

import java.util.Scanner;

public class P3 {

	
	public static void main(String[] args) {
		
		
		//1 US dollar(US$) = 1.82 Singapore dollars (S$)
		//1.) Check for reading input from user
		Scanner reader = new Scanner(System.in); 
		//2.)
		System.out.println("Enter Starting: ");
		int starting =  reader.nextInt();
		System.out.println("Enter Ending: ");
		int ending =  reader.nextInt();
		System.out.println("Enter Increment: ");
		int increment =  reader.nextInt();
		
		if(ending<starting){
			
			System.out.println("(1) starting : " + starting +", ending : "+ ending +", increment : "+increment + " - Error Input!");
		}
		else{
		
		//3.)Check for for loop
		System.out.println("(1) starting : " + starting +", ending : "+ ending +", increment : "+increment);
		System.out.println("--------------");
		
		for(int i=starting;i<=ending;i=i+=increment){
			System.out.println(i +"         " + i*1.82);
		}
		//for loop
		
		//3.)Check for while loop
		System.out.println("(2) starting : " + starting +", ending : "+ ending +", increment : "+increment);
		System.out.println("--------------");
		
		int j = starting;
		while(j<=ending){
			System.out.println(j +"         " + j*1.82);
		j = j+increment;
		}
		//while loop
		
		
		//4.)do while loop
		System.out.println("(3) starting : " + starting +", ending : "+ ending +", increment : "+increment);
		System.out.println("--------------");
		int k = starting;
		
		do{
			//5.)
			//check for output
			
			System.out.println(k +"         " + k*1.82);
			k = k+increment;
			
			
		}while(k<=ending);
		//do-while loop
		}
	}
}
