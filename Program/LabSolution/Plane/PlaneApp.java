import java.util.Scanner;

public class PlaneApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		// declaration of variables
		Scanner sc = new Scanner(System.in);
		int option;
		
		Plane planeInfo = new Plane();
		
		// for assigning custId, seatID
		int seatId, custId;
		
		// do while loop to run application. Option 1-6 will call onto respective function. 7 will exit the loop.
		do {
			// display menu
			System.out.println("(1) Show No. of empty seats");
			System.out.println("(2) Show the list of empty seats");
			System.out.println("(3) Show the list of customers together with their seats numbers in the order of seat numbers");
			System.out.println("(4) Show list of customers together with their seat numbers in the order of customerID");
			System.out.println("(5) Assign a customer to seat");
			System.out.println("(6) Remove a seat assignment");
			System.out.println("(7) Exit");
			System.out.print("Enter option: ");
			option = sc.nextInt();
			System.out.println();
			
			switch(option){
			case 1:
				// show empty seats
				planeInfo.showNumEmptySeats();
				break;
			case 2:
				// display list of empty seats
				planeInfo.showEmptySeats();
				break;
			case 3:
				// show assigned seats, sort by seatID
				planeInfo.showAssignedSeats(true);
				break;
			case 4:
				// show assigned seats, sort by cusID
				planeInfo.showAssignedSeats(false);
				break;
			case 5:
				// capture seatId and cusId info, insert into plane object 
				System.out.print("Please enter SeatID: ");
				seatId = sc.nextInt();
				System.out.println("Please enter CustomerID: ");
				custId = sc.nextInt();
				planeInfo.assignSeat(seatId, custId);
				break;
			case 6:
				// capture seatId, remove from plane object
				System.out.print("Please enter SeatID: ");
				seatId = sc.nextInt();
				planeInfo.unAssignSeat(seatId);
				break;
			case 7:
				System.out.print("Exiting Progam...");
				break;
			default:
				System.out.println("Invalid option\n");
				break;
			}
			
		} while (option != 7);
		
	
	}

}
