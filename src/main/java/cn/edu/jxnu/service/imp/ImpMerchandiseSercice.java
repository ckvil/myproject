package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.Merchandise;
import cn.edu.jxnu.mapper.MerchandiseMapper;
import cn.edu.jxnu.service.MerchandiserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * #Description ImpMerchandiseSerxice
 *
 * @author xh
 * #Date: 2023/3/24 11:34
 */

@Service
public class ImpMerchandiseSercice implements MerchandiserService {

    @Autowired
    MerchandiseMapper merchandiseMapper;

    @Override
    public List<Merchandise> merchandiseList() {
        List<Merchandise> merchandises=merchandiseMapper.queryMerchandiseList();
        return merchandises;
    }

    @Override
    public List<Merchandise> searchMerchandise(String keyword) {
        String keyword1="%"+keyword+"%";

        List<Merchandise> merchandises=merchandiseMapper.queryMerchandiseByMerchandiseNameOrMerchandiseInduce(keyword1);

        return merchandises;
    }

    @Override
    public Merchandise merchandiseParticular(Integer merchandiseId) {
        List<Merchandise> merchandises=merchandiseMapper.findByMerchandiseId(merchandiseId);
        Merchandise expectMerchandise;
        if (merchandises.size()==0){
            expectMerchandise=null;
        }
        else {
            expectMerchandise=merchandises.get(0);
        }

        return expectMerchandise;
    }

    @Override
    public int merchandiseCount(Integer storeId) {
        int count=merchandiseMapper.queryCountByStoreId(storeId);
        return count;
    }

    @Override
    public Merchandise findMerchandise(Integer merchandiseId) {
        Merchandise expectMerchandise;
        List<Merchandise> merchandises=merchandiseMapper.findByMerchandiseId(merchandiseId);
        if (merchandises.size()==0){
            expectMerchandise=null;
        }
        else {
            expectMerchandise=merchandises.get(0);
        }
        return expectMerchandise;
    }

    @Override
    public int saveMerchandise(Merchandise merchandise) {
        int i=merchandiseMapper.insertMerchandise(merchandise);
        return i;
    }

    @Override
    public int deleteMyMerchandise(Merchandise merchandise) {
        int u=merchandiseMapper.updateMerchandiseQuantityByMerchandiseId(merchandise);
        return u;
    }

    @Override
    public int editMyMerchandise(Merchandise merchandise) {
        int u=merchandiseMapper.updateMerchandiseByMerchandiseId(merchandise);
        return u;
    }
}