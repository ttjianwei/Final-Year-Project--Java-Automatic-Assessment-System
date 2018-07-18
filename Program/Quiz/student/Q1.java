
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Q1 {
	

	public static void main(String[] args) {
		
		
while(true){
		  Scanner in = new Scanner(System.in);
		  System.out.println("Enter a String:");
		 
		  String input = in.nextLine();
		  Pattern p = Pattern.compile("[0-9]");   // the pattern to search for
		  Matcher m = p.matcher(input);
		  if (m.find())
		      System.out.println("Output: true");
		    else
		      System.out.println("Output: false");
	}
}
}

