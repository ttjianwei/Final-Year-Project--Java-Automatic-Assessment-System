package lab2;
import java.util.Scanner;
public class Lab2P1 {
	
	
	 public static void main(String[] args)
	 {
	int choice;
	Scanner sc = new Scanner(System.in);
	do {
	System.out.println("Perform the following methods:");
	System.out.println("1: multiplication test");
	System.out.println("2: quotient using division by subtraction");
	System.out.println("3: remainder using division by subtraction");
	System.out.println("4: count the number of digits");
	System.out.println("5: position of a digit");
	System.out.println("6: extract all odd digits");
	System.out.println("7: quit");
	choice = sc.nextInt();
	switch (choice) {
	 case 1: mulTest();
	 break;
	 case 2: 
		 Scanner reader = new Scanner(System.in);
		 System.out.println("Enter value m:");
		 int m = reader.nextInt();
		 System.out.println("Enter value n:");
		 int n = reader.nextInt();
		System.out.println(m+"/"+n +" = "+ divide(m,n));
	 break;
	 case 3:  
	 Scanner modReader = new Scanner(System.in);
	 System.out.println("Enter value m:");
	 int mm = modReader.nextInt();
	 System.out.println("Enter value n:");
	 int nn = modReader.nextInt();
	 System.out.println(mm+"%"+nn +" = "+ modulus(mm,nn));	
	 break;
	 case 4: /* add countDigits() call */
		 Scanner digitReader = new Scanner(System.in);
		 System.out.println("Enter a positive integer n:");
		 int integer = digitReader.nextInt(); 
		 int noOfDigit = countDigits(integer);
		 if(noOfDigit == 1){
			 System.out.println("n: " + integer + " - Error Input!!");
		 }
		 else
			 System.out.println("n: " + integer + " - count = " + noOfDigit);
			 
	 break;
	 
	 case 5: /* add position() call */
		 Scanner posReader = new Scanner(System.in);
		 System.out.println("Enter a positive integer n:");
		 int posInt = posReader.nextInt(); 
		 System.out.println("Enter a digit:");
		 int position = posReader.nextInt(); 
		 int digitPosition = position(posInt, position);
		 System.out.println("position = " + digitPosition );
	 break;
	 case 6: /* add extractOddDigits() call */
		 Scanner oddReader = new Scanner(System.in);
		 System.out.println("Enter a positive integer n:");
		 long odd = oddReader.nextInt(); 
		 if(odd < 0){
			 System.out.println("oddDigits = Error Input!!");
		 }
		 else
		 System.out.println("oddDigits = " +extractOddDigits(odd));
	 break; 
	 case 7: System.out.println("Program terminating ….");
	}
	} while (choice < 7);
	 }
	 
	 
	 public static void mulTest() {
		 Scanner reader = new Scanner(System.in);
		 int firstNo = 1 + (int)(Math.random() * 9); 
		 int secondNo = 1 + (int)(Math.random() * 9); 
		 int result = firstNo * secondNo;
		 System.out.println("How much is " + firstNo + " " + secondNo);
		 int userInput = reader.nextInt();
		 int correct = 0;
		 if(userInput == result){
			 correct = correct++;
		 }
		 System.out.println("give " + correct + "answer(s)");
		 reader.close();
	 }
	 
	 public static int divide(int m, int n) {
		int result = 0;
		 while(m>0){
			 m=m-n;
			result++;
		 }
		 return result;
	 }
	 
	 public static int modulus(int m, int n){
		 
		 while(m>0){
			 m=m-n;
			
		 }
		 if(m!=0){
		 m=m+n;
		 }
		 return m;
		 
	 }
	 
	 public static int countDigits(int n){
		 int noOfDigit = 1;
		 if(n>0){
	
		 while(n>10){
			 n= n/10;
			 noOfDigit++;
		 }
		 }
		 return noOfDigit;
	 }
	 
	 public static int position(int n, int digit){
		 
		 int position =0;
		 int flag = 0;
		 while(flag == 0){
			 int result = n%10;
			 n=n/10;
			 
			 //System.out.println(result);
			 position++;
			 if(result == digit){
				flag =1;
			 }
			 if(n<10 && flag ==0){
				 flag =1;
				 position = -1;
			 }
	
		 }
		 return position;
	 }
	 
	 public static long extractOddDigits(long n){
		 
		 
		 int power =0;
		 long result =0;
		 long digit =0;
		 while(n>0){
			 digit = n%10;
			 n = n/10;
			 if(digit%2!=0){
				 //odd
				 
				 result +=  digit*Math.pow(10, power);
			
				 power++;
			 }
		 }
		
		if(power==0){
			result = -1;
		}
		 return result;
	 }
	 
}
	 /* add method code here */
	


