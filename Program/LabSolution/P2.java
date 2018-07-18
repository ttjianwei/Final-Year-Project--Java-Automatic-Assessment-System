package lab1;

import java.util.Scanner;

public class P2 {

	public static void main(String[] args) {
		//optional
		//initialize grade
		char grade =' ';
	
	//1.)
	//check for BufferedReader object
	//check for System.console().readLine() 
	//check for java.util.Scanner and System.in
	Scanner reader = new Scanner(System.in);  
	
	//2.)	
	//check for two int type variable that store user input
	System.out.println("Enter Salary: ");
	int salary =  reader.nextInt();
	System.out.println("Enter merit: ");
	int merit =  reader.nextInt();
	
	//3. Check for specific range values
	//check for range 500-599,650-700,800-899
	//4. Check for 600-649 with merit,700-749 with merit, 799-899 with merit)
	if(salary<600 && salary > 500){
		grade = 'C';
	}
	else
	if(salary>=600 && salary<=649){
		if(merit >10){
			grade = 'B';
		}
		else grade = 'C';

	}
	else 
	if(salary>=650 && salary < 700){
			grade = 'B';
		}
	else
		if(salary>=700 && salary<=799){
			if(merit >20){
				grade = 'A';
			}
			else grade = 'B';
		}
		else 
			if(salary>799 && salary<=899){
				grade = 'A';
			}
	
	//5.) 
	//check for system.out.println - final output
	System.out.println(grade);
	
	}
}
