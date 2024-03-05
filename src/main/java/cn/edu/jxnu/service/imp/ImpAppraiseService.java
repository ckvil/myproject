package cn.edu.jxnu.service.imp;

import cn.edu.jxnu.domain.Appraise;
import cn.edu.jxnu.mapper.AppraiseMapper;
import cn.edu.jxnu.service.AppraiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * #Description ImpAppraiseService
 *
 * @author xh
 * #Date: 2023/3/28 14:46
 */

@Service
public class ImpAppraiseService implements AppraiseService {

    @Autowired
    AppraiseMapper appraiseMapper;

    @Override
    public List<Appraise> query() {
        return appraiseMapper.query();
    }

    @Override
    public List<Appraise> queryByMerchandiseId(Integer merchandiseId) {
        return appraiseMapper.queryByMerchandiseId(merchandiseId);
    }
}