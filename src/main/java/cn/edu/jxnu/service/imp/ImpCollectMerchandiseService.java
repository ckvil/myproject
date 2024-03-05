package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.CollectMerchandise;
import cn.edu.jxnu.mapper.CollectMerchandiseMapper;
import cn.edu.jxnu.service.CollectMerchandiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * #Description ImpCollectMerchandiseService
 *
 * @author xh
 * #Date: 2023/4/4 11:38
 */

@Service
public class ImpCollectMerchandiseService implements CollectMerchandiseService {

    @Autowired
    CollectMerchandiseMapper collectMerchandiseMapper;

    @Override
    public CollectMerchandise findCollectMerchandise(CollectMerchandise collectMerchandise) {
        CollectMerchandise expectCollectMerchandise;
        List<CollectMerchandise> collectMerchandises=collectMerchandiseMapper.findCollectMerchandise(collectMerchandise);
        if (collectMerchandises.size()==0 || collectMerchandises==null){
            expectCollectMerchandise=null;
        }
        else {
            expectCollectMerchandise=collectMerchandises.get(0);
        }
        return expectCollectMerchandise;
    }
}