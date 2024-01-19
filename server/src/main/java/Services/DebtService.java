package Services;

import model.Debt;
import repository.DebtRepository;

public class DebtService {
    DebtRepository debtRepository;

    public DebtService(DebtRepository _debtRepository) {
        debtRepository = _debtRepository;}

    public void saveDebt(Debt debt){
        debtRepository.save(debt);
    }

    public void removeDebt(Integer id){
        debtRepository.remove(id);
    }

    public void updateDebt(Debt newDebt){
        debtRepository.update(newDebt);
    }

    public Iterable<Debt> getAll(){
        return debtRepository.findAll();
    }

    public Debt getById(Integer id){return debtRepository.findById(id);}
}
