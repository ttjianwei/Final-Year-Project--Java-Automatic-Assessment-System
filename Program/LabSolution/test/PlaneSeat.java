package lab3;

public class PlaneSeat {

	
	
	private int seatId;
	private boolean assigned;
	private int customerId;
	
	public PlaneSeat(int seat_id){
		this.seatId = seat_id;
	}
	
	
	int getSeatID(){
		return seatId;
	}
	
	int getCustomerID(){
		return customerId;
	}
	
	boolean isOccupied(){
		return assigned;
	}
	public void assign(int customerId){
		this.customerId = customerId;
		assigned = true;
	}
	
	public void unassign(){
		customerId = 0;
		assigned = false;
	}
}
