import java.util.Scanner;

public class Q4 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
			while(true){
			  Scanner in = new Scanner(System.in);
			
			  System.out.println("Enter a String:");
			  
			  String userInput = in.nextLine();
			  int counter =0;
			  int error =0;
			  while(counter < userInput.length()/2){
				  
				  if(userInput.charAt(counter) != userInput.charAt((userInput.length()-1-counter))){
					 error++;
				  }
				  counter++;
				  
			  }
			  if(error>0){
				  System.out.println("Output: false");
			  }
		
			  else
				  System.out.println("Output: true");
			  }
			  
			}
	
		
	}

