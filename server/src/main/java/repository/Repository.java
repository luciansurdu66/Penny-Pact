package repository;

import exception.DuplicatedEntityException;
import exception.EntityNotFoundException;

/**
 * Interface representing a generic repository.
 *
 * @param <T>  The type of entities managed by the repository.
 * @param <ID> The type of the entity identifier.
 */
public interface Repository<T, ID> {
    /**
     * Saves a given entity.
     *
     * @param entity The entity to be saved.
     * @throws exception.DuplicatedEntityException The entity already exists.
     */
    void save(T entity) throws DuplicatedEntityException;

    /**
     * Retrieves an entity by its id.
     *
     * @param id The id of the entity.
     * @return The entity with the given id or null if not found.
     */
    T findById(ID id);

    /**
     * Retrieves all the entities.
     *
     * @return An iterable containing all the entities.
     */
    Iterable<T> findAll();

    /**
     * Updates an entity.
     *
     * @param modifiedEntity The entity containing the modified information.
     * @throws EntityNotFoundException The entity does not exist.
     */
    void update(T modifiedEntity) throws EntityNotFoundException;

    /**
     * Removes an entity by its id.
     *
     * @param id The id of the entity.
     * @return The removed entity.
     * @throws EntityNotFoundException The entity doesn't exist.
     */
    T remove(ID id) throws EntityNotFoundException;
}
