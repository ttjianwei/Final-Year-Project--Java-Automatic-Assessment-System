import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class Q3 {

	
	public static void main(String[] args) {
		
		
		while(true){
		  Scanner in = new Scanner(System.in);
		  System.out.println("Enter first String:");
		  String inputOne = in.nextLine();
		  System.out.println("Enter second String:");
		  String inputTwo = in.nextLine();
		  ArrayList<Character> checkStringOne = new ArrayList<Character>();
		  ArrayList<Character> checkStringTwo = new ArrayList<Character>();
		  int error = 0;
		  if(!(inputOne.length()==inputTwo.length())){
			  System.out.println("Output: False");
		  }
		  else{
			 for(int i=0;i<inputOne.length();i++){
				 checkStringOne.add(inputOne.charAt(i));
			 }
			 for(int i=0;i<inputTwo.length();i++){
				 checkStringTwo.add(inputTwo.charAt(i));
			 }
			 Collections.sort(checkStringOne);
			 Collections.sort(checkStringTwo);
			 for(int i=0;i<checkStringOne.size();i++){
				if(!(checkStringOne.get(i)==checkStringTwo.get(i))){
					error++;
				}
			 }
			 
			  if(error > 0){
				  System.out.println("Output: False");
			  }
			  else{
				  System.out.println("Output: True");
			  }
		  }
		  
	
		  }
		  
	}
	
}
