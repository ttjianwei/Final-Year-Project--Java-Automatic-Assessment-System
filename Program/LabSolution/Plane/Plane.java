public class Plane {
	
	
	private PlaneSeat[] seat;
	private int numEmptySeat;
	private static int TOTAL_SEATS = 12;
	
	
	public Plane() {
		seat = new PlaneSeat[TOTAL_SEATS];
		numEmptySeat = TOTAL_SEATS;
		
		for (int i =0; i< TOTAL_SEATS; i++){
			seat[i] = new PlaneSeat(i+1);
		}
	}
	
	
	// method
	private PlaneSeat[] sortSeats(){
		
	    PlaneSeat[] tempList = new PlaneSeat[TOTAL_SEATS];
	    int temp1, temp2;

	    // make a copy of original seat
	    for (int k = 0; k <TOTAL_SEATS; k++){
	    	tempList[k] = seat[k];
	    }
	    
	    // traverse across copySeats
	    for (int i = 0; i < TOTAL_SEATS; i++) {
	        for (int j = 0; j < TOTAL_SEATS; j++) {
	            if (tempList[i].isOccupied()) {
	            	// take customerID to compare
	                temp1 = tempList[i].getCustomerID();
	                temp2 = tempList[j].getCustomerID();
	                
	                // if target 1 is smaller than target 2, swap position
	                if (temp1 < temp2){
	                	PlaneSeat tempSeat = tempList[i];
	                    tempList[i] = tempList[j];
	                    tempList[j] = tempSeat;
	                }
	            }
	        }
	    }
	    return tempList;
	}
	
	public void showNumEmptySeats(){ 
		// display amount of empty seat
		System.out.println("There are " + numEmptySeat +" empty seats\n");
	}
	
	public void showEmptySeats() {
		System.out.println("List of empty seats:");
		
		for (int i=0; i <TOTAL_SEATS; i++){
			// check if seat is empty and display empty seats available
			if (!seat[i].isOccupied())
				System.out.println("SeatId: " + seat[i].getSeatID());
		}
		System.out.println("");
	}
	
    public void showAssignedSeats(boolean bySeatId)
    {
            PlaneSeat SortbyCustID[]= new PlaneSeat[TOTAL_SEATS];
           
            System.out.println("The seat assignments are as follow:");
            // boolean = true, sort by seatID
            if (bySeatId)
            {
	            for (int i=0;i<TOTAL_SEATS;i++) {
	                    if (seat[i].isOccupied())
	                            System.out.println("SeatID " + seat[i].getSeatID() + " assigned to CustomerID " + seat[i].getCustomerID());
	            }       
            }
            // boolean = false, sort by custID
            else{
            	// call sort method
            	SortbyCustID = sortSeats();
            	for (int i = 0; i <TOTAL_SEATS; i++){
            		if(SortbyCustID[i].isOccupied())
            			System.out.println("SeatID " + SortbyCustID[i].getSeatID() + " assigned to CustomerID " + SortbyCustID[i].getCustomerID());	
            	}
            }
    }
	public void assignSeat(int seatId, int cus_id) {

		// check if seatId exceed range of 1 to 12
		if (seatId >=13 && seatId <=0)
			System.out.println("Invalid seatID\n");
		
		// check if seat is assigned
		if(seat[seatId-1].isOccupied())
			System.out.println("Seat already assigned to a customer!\n");
		// if seat is empty, assigned customer to seat
		else{
			seat[seatId-1].assign(cus_id);
			
			// decrease empty seat
			numEmptySeat--;
			
			//display output
			System.out.println("Seat Assigned!\n");
		}
	}
	public void unAssignSeat(int seatId){
		
		// check if seatId exceed range of 1 to 12
		if (seatId >=13 && seatId <=0)
			
		// check if seat is occupied
		if (seat[seatId-1].isOccupied()){
			
			// free seat
			seat[seatId-1].unassign();
			
			// increase amount of empty seat
			numEmptySeat++;
			
			System.out.println("Seat unassigned!\n");
		}
		// if seat is unoccupied
		else
			System.out.println("Seat unoccupied!\n");
	}
}
