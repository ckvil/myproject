package cn.edu.jxnu.service;

import cn.edu.jxnu.domain.CollectMerchandise;
import org.springframework.stereotype.Service;


/**
 * #Description CollectMerchandiseService
 *
 * @author xh
 * #Date: 2023/4/4 11:37
 */

@Service
public interface CollectMerchandiseService {

    public CollectMerchandise findCollectMerchandise(CollectMerchandise collectMerchandise);

}