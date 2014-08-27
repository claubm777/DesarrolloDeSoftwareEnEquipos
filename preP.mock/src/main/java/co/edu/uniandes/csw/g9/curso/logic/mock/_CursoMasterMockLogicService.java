/* ========================================================================
 * Copyright 2014 g9
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 g9

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/

package co.edu.uniandes.csw.g9.curso.logic.mock;
import java.util.ArrayList;
import java.util.List;

import co.edu.uniandes.csw.g9.curso.logic.dto.CursoDTO;
import co.edu.uniandes.csw.g9.curso.logic.api.ICursoLogicService;
import co.edu.uniandes.csw.g9.curso.master.logic.api._ICursoMasterLogicService;
import co.edu.uniandes.csw.g9.curso.master.logic.dto.CursoMasterDTO;
import co.edu.uniandes.csw.g9.seccion.logic.api.ISeccionLogicService;
import co.edu.uniandes.csw.g9.seccion.logic.dto.SeccionDTO;
import javax.inject.Inject;


public abstract class _CursoMasterMockLogicService implements _ICursoMasterLogicService {

    protected static ArrayList<CursoMasterDTO> cursoMasterDtosList = new ArrayList<CursoMasterDTO>() ;
    @Inject
    protected ISeccionLogicService seccionPersistance;
    @Inject
    protected ICursoLogicService cursoPersistance;

    public CursoMasterDTO createMasterCurso(CursoMasterDTO curso) {

        cursoPersistance.createCurso(curso.getCursoEntity());
        for (SeccionDTO dto : curso.getCreateseccion_curso()) {
            seccionPersistance.createSeccion(dto);
        }
        cursoMasterDtosList.add(curso);
        return curso;
    }

    public CursoMasterDTO getMasterCurso(Long id) {
        for (CursoMasterDTO cursoMasterDTO : cursoMasterDtosList) {
            if (cursoMasterDTO.getCursoEntity().getId() == id) {
                return cursoMasterDTO;
            }
        }

        return null;
    }

    public void deleteMasterCurso(Long id) {
        for (CursoMasterDTO cursoMasterDTO : cursoMasterDtosList) {
            if (cursoMasterDTO.getCursoEntity().getId() == id) {

                for (SeccionDTO dto : cursoMasterDTO.getCreateseccion_curso()) {
                    seccionPersistance.deleteSeccion(dto.getId());
                }
                cursoPersistance.deleteCurso(cursoMasterDTO.getId());
                cursoMasterDtosList.remove(cursoMasterDTO);
            }
        }

    }

    public void updateMasterCurso(CursoMasterDTO curso) {

        // update Seccion
        if (curso.getUpdateseccion_curso() != null) {
            for (SeccionDTO dto : curso.getUpdateseccion_curso()) {
                seccionPersistance.updateSeccion(dto);
            }
        }
        // persist new Seccion
        if (curso.getCreateseccion_curso() != null) {
            for (SeccionDTO dto : curso.getCreateseccion_curso()) {
                SeccionDTO persistedSeccionDTO = seccionPersistance.createSeccion(dto);
                dto = persistedSeccionDTO;
            }
        }
        // delete Seccion
        if (curso.getDeleteseccion_curso() != null) {
            for (SeccionDTO dto : curso.getDeleteseccion_curso()) {

                seccionPersistance.deleteSeccion(dto.getId());
            }
        }
    }
}