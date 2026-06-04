/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.OrgDetails
 *  com.estrat.service.db.dao.OrgDetailsRepository
 *  com.estrat.service.db.service.OrgDetailsService
 *  javax.transaction.Transactional
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.OrgDetails;
import com.estrat.service.db.dao.OrgDetailsRepository;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Optional;
import javax.transaction.Transactional;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class OrgDetailsService {
    @Autowired
    private OrgDetailsRepository orgDetailsRepository;

    public Optional<OrgDetails> findById(long id) {
        return this.orgDetailsRepository.findById(id);
    }

    public OrgDetails save(OrgDetails orgDetails) {
        return (OrgDetails)this.orgDetailsRepository.save(orgDetails);
    }

    public OrgDetails findByName(String name) {
        try {
            String decodedname = URLDecoder.decode(URLDecoder.decode(name, "UTF-8"), "UTF-8");
            return this.orgDetailsRepository.findByName(decodedname, "Active");
        }
        catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }
}

