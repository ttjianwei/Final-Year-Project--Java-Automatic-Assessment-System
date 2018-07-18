
import java.util.ArrayList;
import java.util.Scanner;

public class Q2 {
	
	public static void main(String[] args) {
		while(true){
	  Scanner in = new Scanner(System.in);
	  System.out.println("Enter a String:");
	  String input = in.nextLine();
	  String output ="";
	  
	  for(int i=(input.length()-1);i>=0;i--){
		  
		  output += input.charAt(i);
	  }
	 System.out.println("Output: " + output);

}
	}
}
